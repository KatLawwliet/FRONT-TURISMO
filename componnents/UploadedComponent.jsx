import React, {useRef, useState} from 'react';

import { createClient } from '@supabase/supabase-js'

import Constants from 'expo-constants';
import Button from "./ButtonComponnent";

const { supabaseUrl, supabaseAnonKey, bucketName } = Constants.easConfig.extra;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FileUploader = ({setImage}) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) throw new Error("Debe seleccionar un archivo para subir.");

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            let { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);
            if (uploadError) throw uploadError;
            const urlImage = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`
            setImage(urlImage)
            alert(`Archivo subido con éxito: ${urlImage}`);
        } catch (error) {
            alert(`Error al subir el archivo: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
                disabled={uploading}
                onChange={handleFileChange}
            />
            <Button
                text={uploading ? 'Cargando...' : 'Subir Archivo'}
                clickAction={triggerFileInput}
                color="#028035"
            />
            {uploading && <p>Cargando imagen...</p>}
        </div>
    );
};

const styles = {
    input: {
        backgroundColor: 'red'
    }
}

export default FileUploader;