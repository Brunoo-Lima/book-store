import { Address, IClient } from '@/@types/client';

export const filteringOptionsAddresses = (
  data: IClient[],
  property: string
) => {
  return Array.from(
    new Set(
      data.flatMap((client) =>
        client.addresses.map((address) => address[property as keyof Address])
      )
    )
  )
    .filter((item) => item !== undefined)
    .map((item) => ({
      label: String(item),
      value: String(item),
    }));
};
