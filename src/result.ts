import * as Melange_result from "../vendor/melange/result.mjs";
import { Brand } from "./brand";
import { Option } from "./option";

declare const OK: unique symbol;
declare const ERROR: unique symbol;

/**
 * Represents a successful result.
 * @template T The type of the successful value.
 */
export type Ok<T> = Brand<T, typeof OK>;

/**
 * Represents an error result.
 * @template E The type of the error.
 */
export type Error<E> = Brand<E, typeof ERROR>;

/**
 * Represents a type that can either be a successful result (Ok) or an error result (Error).
 * @template T The type of the successful value.
 * @template E The type of the error.
 */
export type Result<T, E> = Ok<T> | Error<E>;

/**
 * Creates an Ok Result.
 * @template T The type of the value.
 * @param {T} value The value to encapsulate in the Ok Result.
 * @returns {Ok<T>} An Ok Result containing the value.
 */
function ok<T>(value: T): Ok<T> {
  return Melange_result.ok(value) as unknown as Ok<T>;
}

/**
 * Creates an Error Result.
 * @template E The type of the error.
 * @param {E} value The error to encapsulate in the Error Result.
 * @returns {Error<E>} An Error Result containing the error.
 */
function error<E>(value: E): Error<E> {
  return Melange_result.error(value) as unknown as Error<E>;
}

/**
 * Checks if a Result is an Ok.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} result The Result to check.
 * @returns {boolean} True if the Result is an Ok, false otherwise.
 */
function isOk<T, E>(result: Result<T, E>): boolean {
  return Melange_result.is_ok(result);
}

/**
 * Checks if a Result is an Error.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} value The Result to check.
 * @returns {boolean} True if the Result is an Error, false otherwise.
 */
function isError<T, E>(value: Result<T, E>): boolean {
  return Melange_result.is_error(value);
}

/**
 * Checks if a value is a Result.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} value The value to check.
 * @returns {boolean} True if the value is a Result, false otherwise.
 */
function isResult<T, E>(value: Result<T, E>): boolean {
  return isOk(value) || isError(value);
}

/**
 * Converts a Result to an Option, discarding the error if present.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} result The Result to convert.
 * @returns {Option<T>} An Option containing the Ok value, or None if the Result is an Error.
 */
function toOption<T, E>(result: Result<T, E>): Option<T> {
  return Melange_result.to_option(result);
}

/**
 * Maps a Result to another using the provided function.
 * @template T The type of the value in the original Result.
 * @template U The type of the value in the new Result.
 * @template E The type of the error in the Result.
 * @param {(value: T) => U} fn The mapping function.
 * @param {Result<T, E>} result The original Result.
 * @returns {Result<U, E>} The new Result after applying the mapping function.
 */
function map<T, U, E>(fn: (value: T) => U, result: Result<T, E>): Result<U, E> {
  return Melange_result.map(fn, result);
}

/**
 * Applies a function to a Result and flattens the result.
 * @template T The type of the value in the original Result.
 * @template U The type of the value in the new Result.
 * @template E The type of the error in the Result.
 * @param {(value: T) => Result<U, E>} fn The function to apply.
 * @param {Result<T, E>} result The original Result.
 * @returns {Result<U, E>} The new Result after applying the function.
 */
function then<T, U, E>(
  fn: (value: T) => Result<U, E>,
  result: Result<T, E>,
): Result<U, E> {
  return Melange_result.bind(result, fn);
}

/**
 * Unwraps a Result, returning the default value if it is an Error.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} result The Result to unwrap.
 * @param {T} defaultValue The default value to use if the Result is an Error.
 * @returns {T} The unwrapped value or the default value.
 */
function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return Melange_result.value(result, defaultValue);
}

/**
 * Unwraps a Result, throwing an error if it is an Error.
 * @template T The type of the value in the Result.
 * @template E The type of the error in the Result.
 * @param {Result<T, E>} result The Result to unwrap.
 * @returns {T} The unwrapped value.
 * @throws Will throw an error if the Result is an Error.
 */
function unwrap<T, E>(result: Result<T, E>): T {
  return Melange_result.get_ok(result);
}
export const Result = {
  ok,
  error,
  isOk,
  isError,
  isResult,
  toOption,
  map,
  then,
  unwrapOr,
  unwrap,
} as const;