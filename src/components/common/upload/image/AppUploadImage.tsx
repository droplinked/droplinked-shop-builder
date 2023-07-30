import axios from 'axios';
import React, { useCallback, useRef } from 'react'
import { useMutation } from 'react-query';
import DefaultHoverBox from './parts/default/DefaultHoverBox';

type imagesTypes = "small" | "original" | "standard"
type imagesMap = { [KEY in imagesTypes]: string }

interface IProps {
    values: Array<string> | string
    onChange(images: imagesMap): void
}

function AppUploadImage({ onChange, values }: IProps) {
    const { mutateAsync, isLoading } = useMutation((formData: any) => axios.post("https://cdn.droplinked.com/upload", formData))
    const fileRef = useRef(null);

    const changeImage = useCallback(async (e: any) => {
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            const data = await mutateAsync(formData)
            onChange(data.data)
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <DefaultHoverBox onClick={() => fileRef.current.click()} />
            <input type="file" className="d-none" ref={fileRef} onChange={changeImage} />
        </>
    )
}

export default AppUploadImage