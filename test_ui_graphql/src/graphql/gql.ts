/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query CompanyQuery {\n  applicantIndividualCompanyRelations {\n    data {\n      id\n      name\n    }\n  }\n  applicantIndividualCompanyPositions {\n    data {\n      id\n      name\n    }\n  }\n}": types.CompanyQueryDocument,
};

export function graphql(source: "query CompanyQuery {\n  applicantIndividualCompanyRelations {\n    data {\n      id\n      name\n    }\n  }\n  applicantIndividualCompanyPositions {\n    data {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query CompanyQuery {\n  applicantIndividualCompanyRelations {\n    data {\n      id\n      name\n    }\n  }\n  applicantIndividualCompanyPositions {\n    data {\n      id\n      name\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;