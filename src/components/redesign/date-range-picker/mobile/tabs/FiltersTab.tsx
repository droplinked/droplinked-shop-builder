import React from 'react';
import SideControls from '../../components/SideControls';

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    setTempValue: (value: Value) => void;
}

export default function FiltersTab({ setTempValue }: Props) {
    return <SideControls setTempValue={setTempValue} />;
}
