type FieldErrors = Record<string, unknown>;

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function firstFromBag(bag: FieldErrors): string | null {
  for (const k of Object.keys(bag)) {
    const v = bag[k];
    if (Array.isArray(v) && v.length) return String(v[0]);
    if (typeof v === "string") return v;
  }
  return null;
}

export function extractErrorMessage(err: any): string {
  // ofetch/FetchError common structure: { data, statusMessage, message }
  const data = err?.data;

  // to String
  if (typeof data === "string") return data;

  // Common message
  if (isObject(data)) {
    if (typeof data.detail === "string") return data.detail;
    if (typeof (data as any).message === "string") return (data as any).message;

    // dj-rest-auth / DRF field & non_field_errors
    if (Array.isArray((data as any).non_field_errors) && (data as any).non_field_errors.length) {
      return String((data as any).non_field_errors[0]);
    }

    const fieldMsg = firstFromBag(data);
    if (fieldMsg) return fieldMsg;
  }

  // ofetch fallback
  if (typeof err?.statusMessage === "string") return err.statusMessage;
  if (typeof err?.message === "string") return err.message;

  return "Something went wrong. Please try again.";
}

export function useErrorMessage() {
  const last = ref<string | null>(null);

  function toMessage(err: unknown): string {
    const msg = extractErrorMessage(err);
    last.value = msg;
    return msg;
  }

  return {
    last,      // for displaying the latest error on the page
    toMessage, // convert any error to a readable string
  };
}
