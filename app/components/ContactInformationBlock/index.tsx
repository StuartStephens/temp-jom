"use client";
import { useState } from "react";
import { IAddressForm } from "../../components/AddressForm";
import { PhoneNumbers } from "../../components/PhoneNumbers";
import { DisplayEmails } from "../../components/EmailAddress/DisplayEmails";
import { StoredAddresses } from "../../StoredAddresses";

export interface IContactInformationBlockProps { }

export function ContactInformationBlock(props: IContactInformationBlockProps) {
  const [storedAddresses, setStoredAddresses] = useState<IAddressForm[]>([]);
  function removeAddress(indexToRemove: number) {
    const newAddresses = storedAddresses.filter((o, i) => i !== indexToRemove);
    setStoredAddresses(newAddresses);
  }

  function updateAddress(address: IAddressForm, indexToUpdate: number) {
    const newAddresses = storedAddresses.filter((o, i) => i !== indexToUpdate);
    setStoredAddresses([...newAddresses, address]);
  }

  function addAddress(address: IAddressForm) {
    const newAddrs: IAddressForm[] = storedAddresses
      ? JSON.parse(JSON.stringify(storedAddresses))
      : [];
    newAddrs.push(address);
    setStoredAddresses(newAddrs);
  }
  return (
    <>
      <DisplayEmails />
      <PhoneNumbers />
      <StoredAddresses
        // addresses={storedAddresses}
        onRemoveAddress={removeAddress}
        onEditAddress={updateAddress}
        onAddAddress={addAddress}
      />
    </>
  );
}
