import { mongoose } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { Nullable } from './native';

export type MongoDBMatches<T = any> = FilterQuery<T>;
export type MongoDBSorts = any;

export type ObjectId = mongoose.Types.ObjectId;

export const ObjectId = function (objectIdString?: string): ObjectId {
  return new mongoose.Types.ObjectId(objectIdString);
};

export const NullableObjectId = function (
  objectIdString: Nullable<string>,
): Nullable<ObjectId> {
  if (objectIdString == null) {
    return null;
  }
  return new mongoose.Types.ObjectId(objectIdString);
};

export const ObjectIdToString = (id?: ObjectId): Nullable<string> =>
  id?.toHexString() || null;
export const ObjectIdsToStrings = (ids?: ObjectId[]): Nullable<string[]> =>
  ids?.map((id) => id.toHexString()) || null;
