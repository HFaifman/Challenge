export = getHash;

type Hash = {
  [key]: string | number | boolean;
};

declare function getHash(format: string, instance: string): Hash;
