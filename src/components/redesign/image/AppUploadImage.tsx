import axios from 'axios';
import AppScrollBar from 'components/common/scrollbar';
import useAppToast from 'hooks/toast/useToast';
import React, { useCallback, useRef } from 'react';
import { useMutation } from 'react-query';
import FileUpload from '../file-upload/FileUpload';
import appUploadImageContext, { IUploadImageDefault, ImodeUploadImage } from './context';
import UploadImageModel from './model';

type sizes = "small" | "original" | "standard"

interface IFileData {
    title: string;
    size: string;
}

/**
 * AppUploadImage Component - Handles image uploads with size variations
 * 
 * Supports single or multiple file uploads, with automatic processing of images
 * into different sizes. Shows toast notifications and handles file validation.
 * 
 * @param {object} props - Component props
 * @param {Array<any>|string} props.values - Current image values, array for multiple, string for single
 * @param {Function} props.onChange - Callback when images are added
 * @param {Function} [props.onSuccess] - Callback after successful upload
 * @param {Function} [props.onDelete] - Callback when images are deleted
 * @param {string} [props.toast] - Custom success message to display
 * @param {sizes} [props.size] - Image size variant to use from API response
 * @param {boolean} [props.product] - Whether this is for a product image upload
 * @param {ImodeUploadImage} [props.mode='multi'] - Upload mode (single/multiple)
 * @param {IUploadImageDefault} [props.defaults] - Default values for the uploader
 * @param {object} props.accept - File types to accept in format {type: [extension]}
 * @param {function} props.setFileData - Callback to set file metadata
 */
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
    accept: {
        [key: string]: string[];
    };
    setFileData: (value: IFileData) => void;
}

function AppUploadImage({ onChange, product, values, size, toast, onSuccess, mode = "multi", onDelete, defaults, accept, setFileData }: IProps) {
    const { mutateAsync, isLoading } = useMutation((formData: any) => axios.post("https://tools.droplinked.com/upload", formData))
    const fileRef = useRef(null);
    const { showToast } = useAppToast()

    const create = useCallback(async (file: File) => {
        try {
            UploadImageModel.validate(file)
            const formData = new FormData();
            formData.append("image", file);
            const data = await mutateAsync(formData)
            const images = product ? { url: data.data[size], thumbnail: data.data['small'] } : size ? data.data[size] : data.data
            onChange(typeof values === "object" ? [...values, images] : images)
            if (onSuccess) onSuccess(data.data)
            showToast({ message: toast || "Image has been uploaded!", type: "success" })
            const fileSize = (file.size / 1024 / 1024) > 1 ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : `${(file.size / 1024).toFixed(2)}KB`;
            setFileData({ title: file.name, size: fileSize });
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
        <appUploadImageContext.Provider
            value={{
                values,
                openFile: () => fileRef.current.click(),
                deleted,
                isLoading,
                product,
                mode,
                defaults
            }}
        >
            <AppScrollBar maxHeight="425px" overflow="auto">
                <FileUpload isLoading={isLoading} accept={accept} multiple={false} onFileChange={create} />
            </AppScrollBar>
        </appUploadImageContext.Provider>
    )
}

export default AppUploadImage