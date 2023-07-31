import axios from 'axios';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useCallback, useRef } from 'react'
import { useMutation } from 'react-query';
import appUploadImageContext from './context';
import UploadImageModel from './model';
import DefaultHoverBox from './parts/default/DefaultHoverBox';

interface IProps {
    values: Array<string> | string
    onChange: Function
    onSuccess?: Function
    toast?: string
    size?: "small" | "original" | "standard"
}

function AppUploadImage({ onChange, values, size = "standard", toast, onSuccess }: IProps) {
    const { mutateAsync, isLoading } = useMutation((formData: any) => axios.post("https://cdn.droplinked.com/upload", formData))
    const fileRef = useRef(null);
    const { showToast } = useAppToast()

    const create = useCallback(async (e: any) => {
        try {
            const file = e.target.files[0];
            UploadImageModel.validate(file)
            const formData = new FormData();
            formData.append("image", file);
            const data = await mutateAsync(formData)
            onChange(typeof values === "object" ? [...values, data.data[size]] : data.data[size])
            if (onSuccess) onSuccess(data.data)
            showToast(toast || "Upload image successful", "success")
        } catch (error) {
            showToast(error.message, "error");
        }
    }, [values, toast])

    const deleted = useCallback((name: string) => {
        if (typeof values !== "object") return false
        onChange(values.filter(el => el !== name))
        showToast("Delete image successful", "success")
    }, [values, onChange])

    return (
        <appUploadImageContext.Provider value={{
            values,
            openFile: () => fileRef.current.click(),
            deleted,
            isLoading
        }}>
            <DefaultHoverBox />
            <input type="file" className="d-none" ref={fileRef} onChange={create} />
        </appUploadImageContext.Provider>
    )
}

export default AppUploadImage