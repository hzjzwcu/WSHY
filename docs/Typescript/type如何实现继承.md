## type如何实现继承

```ts
type BasicAddress = {
    city: string;
};

type AddressWithPostalCode = BasicAddress & {
    postalCode: string;
};

const address: AddressWithPostalCode = {
    city: "Anytown",
    postalCode: "12345"
};

```

