/** @jsxImportSource @emotion/react */
import * as s from "./AuthStyle";
import React from 'react'

interface AddressModalProps{
    onClose: () => void;
    onComplete: (address: string, zonecode: string) => void;
}

function AddressModal({onClose, onComplete}: AddressModalProps) {
    const handleComplete = (data: any) => {
        const {address, zonecode} = data;
        onComplete(address, zonecode);
        onClose();
    };
  return (
    <div css={s.overlay}>
        <div css={s.modal}>
            <button onClick={onClose} css={s.closeButton}>X</button>
            <DaumPostcodeEmbed
                onComplete={handleComplete}
            />
        </div>

    </div>
  )
}

export default AddressModal