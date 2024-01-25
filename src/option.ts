import * as Melange_option from "../vendor/melange/option.mjs";
import { Brand } from "./brand";
import { Result } from "./result";

declare const SOME: unique symbol;
declare const NONE: unique symbol;

/**
 * Represents an option type, encapsulating an optional value.
 * @template T The type of the value.
 */
export type Some<T> = Brand<T, typeof SOME>;

/**
 * Represents the absence of a value.
 */
export type None = Brand<undefined | null, typeof NONE>;

/**
 * Represents an option which can either be Some or None.
 * @template T The type of the value.
 */
export type Option<T> = Some<T> | None;
/**
 * Creates an Option with a value.
 * @template T The type of the value.
 * @param {T} value The value to be encapsulated.
 * @returns {Option<T>} An Option containing the value.
 */
function some<T>(value: T): Option<T> {
  return Melange_option.some(value);
}

/**
 * Creates an Option with no value (None).
 * @returns {None} An Option representing None.
 */
function none(): None {
  return Melange_option.none as None;
}

/**
 * Checks if the Option is a Some.
 * @template T The type of the value in Option.
 * @param {Option<T>} value The Option to check.
 * @returns {boolean} True if the Option is Some, false otherwise.
 */
function isSome<T>(value: Option<T>): boolean {
  return Melange_option.is_some(value);
}

/**
 * Checks if the Option is a None.
 * @template T The type of the value in Option.
 * @param {Option<T>} value The Option to check.
 * @returns {boolean} True if the Option is None, false otherwise.
 */
function isNone<T>(value: Option<T>): boolean {
  return Melange_option.is_none(value);
}

/**
 * Checks if a value is an Option.
 * @template T The type of the value in Option.
 * @param {any} value The value to check.
 * @returns {boolean} True if the value is an Option, false otherwise.
 */
function isOption<T>(value: T): boolean {
  return isSome(value as Option<T>) || isNone(value as Option<T>);
}

/**
 * Maps an Option to another using the provided function.
 * @template T The type of the value in the original Option.
 * @template U The type of the value in the new Option.
 * @param {(value: T) => U} fn The mapping function.
 * @param {Option<T>} option The original Option.
 * @returns {Option<U>} The new Option after applying the mapping function.
 */
function map<T, U>(fn: (value: T) => U, option: Option<T>): Option<U> {
  return Melange_option.map(fn, option);
}

/**
 * Applies a function to an Option and flattens the result.
 * @template T The type of the value in the original Option.
 * @template U The type of the value in the new Option.
 * @param {(value: T) => Option<U>} fn The function to apply.
 * @param {Option<T>} option The original Option.
 * @returns {Option<U>} The new Option after applying the function.
 */
function then<T, U>(fn: (value: T) => Option<U>, option: Option<T>): Option<U> {
  return Melange_option.bind(option, fn);
}

/**
 * Unwraps an Option, returning the default value if it is None.
 * @template T The type of the value, constrained to number.
 * @param {Option<T>} option The Option to unwrap.
 * @param {T} defaultValue The default value to return if Option is None.
 * @returns {T} The unwrapped value or the default value.
 */
function unwrapOr<T extends number>(option: Option<T>, defaultValue: T): T {
  return Melange_option.value(option, defaultValue);
}

/**
 * Unwraps an Option, throwing an error if it is None.
 * @template T The type of the value in the Option.
 * @param {Option<T>} option The Option to unwrap.
 * @returns {T} The unwrapped value.
 * @throws Will throw an error if the Option is None.
 */
function unwrap<T>(option: Option<T>): T {
  return Melange_option.get(option);
}

/**
 * Converts an Option to a Result.
 * @template T The type of the value in the Option.
 * @template E The type of the error in the Result.
 * @param {Option<T>} value The Option to convert.
 * @param {E} error The error value to use in case of None.
 * @returns {Result<T, E>} The resulting Result object.
 */
function toResult<T, E>(value: Option<T>, error: E): Result<T, E> {
  return Melange_option.to_result(value, error) as unknown as Result<T, E>;
}

export const Option = {
  some,
  none,
  isSome,
  isNone,
  isOption,
  map,
  then,
  unwrapOr,
  unwrap,
  toResult,
};