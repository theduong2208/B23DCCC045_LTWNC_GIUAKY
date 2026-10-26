/**
 * Generic Discriminated Union cho mọi phản hồi API.
 * Dùng Type Guard isSuccess / isFailure để narrowing an toàn.
 */
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Type Guard — trả về true khi phản hồi thành công */
export function isSuccess<T>(res: ApiResponse<T>): res is { ok: true; data: T } {
  return res.ok === true;
}

/** Type Guard — trả về true khi phản hồi lỗi */
export function isFailure<T>(res: ApiResponse<T>): res is { ok: false; error: string } {
  return res.ok === false;
}
