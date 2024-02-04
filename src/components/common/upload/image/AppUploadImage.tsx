import axios from 'axios';
import AppScrollBar from 'components/common/scrollbar';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useCallback, useRef } from 'react';
import { useMutation } from 'react-query';
import appUploadImageContext, { ImodeUploadImage, IUploadImageDefault } from './context';
import UploadImageModel from './model';
import DefaultHoverBox from './parts/default/DefaultHoverBox';

type sizes = "small" | "original" | "standard"

interface IProps {
    values: Array<any> | string
    onChange: Function
    onSuccess?: Function
    onDelete?: Function
    toast?: string
    size?: sizes
    product?: boolean
    mode?: ImodeUploadImage
    defaults?: IUploadImageDefault
}

function AppUploadImage({ onChange, product, values, size, toast, onSuccess, mode = "multi", onDelete, defaults }: IProps) {
    const { mutateAsync, isLoading } = useMutation((formData: any) => axios.post("https://d2kpv1k2vro2sk.cloudfront.net/upload", formData))
    const fileRef = useRef(null);
    const { showToast } = useAppToast()

    const create = useCallback(async (e: any) => {
        try {
            const file = e.target.files[0];
            UploadImageModel.validate(file)
            const formData = new FormData();
            formData.append("image", file);
            const data = await mutateAsync(formData)
            const images = product ? { url: data.data[size], thumbnail: data.data['small'] } : size ? data.data[size] : data.data
            onChange(typeof values === "object" ? [...values, images] : images)
            if (onSuccess) onSuccess(data.data)
            showToast({ message: toast || "Image has been uploaded!", type: "success" })
        } catch (error) {
            showToast({ message: error.message, type: "error" });
        }
    }, [values, toast, size, product])

    const deleted = useCallback((name: string) => {
        if (typeof values !== "object") return false
        values = values.filter(el => el !== name)
        onChange(values)
        if (onDelete) onDelete(values)
        showToast({ message: "Image has been deleted successfully", type: "success" })
    }, [values, onChange, onDelete])

    return (
        <appUploadImageContext.Provider value={{
            values,
            openFile: () => fileRef.current.click(),
            deleted,
            isLoading,
            product,
            mode,
            defaults
        }}>
            <AppScrollBar maxHeight="425px" overflow="auto">
                <DefaultHoverBox />
                <input type="file" className="d-none" ref={fileRef} onChange={create} />
            </AppScrollBar>
        </appUploadImageContext.Provider>
    )
}

export default AppUploadImage