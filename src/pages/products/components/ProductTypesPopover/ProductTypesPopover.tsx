import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import * as React from 'react';
import ProductTypes from './components/ProductTypes';
interface Props {
    onProductTypeSelection: (productType: string) => void;
    children: React.ReactNode;
}
function ProductTypesPopover({ onProductTypeSelection, children }: Props) {
    return (
        <Popover closeOnEsc closeOnBlur>
            <PopoverTrigger>
                <div>
                    {children}
                </div>
            </PopoverTrigger>
            <PopoverContent width="500px" backgroundColor="#141414" border={"none"}>
                <PopoverBody>
                    <ProductTypes onProductTypeSelection={onProductTypeSelection} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default ProductTypesPopover;