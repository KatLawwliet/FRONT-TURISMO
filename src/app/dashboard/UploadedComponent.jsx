import React, {useRef, useState} from 'react';

import { createClient } from '@supabase/supabase-js'

import Button from "./ButtonComponnent";

const supabase = createClient(
    `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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

            let { error: uploadError } = await supabase.storage.from("turismo").upload(filePath, file);
            if (uploadError) throw uploadError;
            const urlImage = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${"turismo"}/${filePath}`
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
            {uploading && <div>Cargando imagen...</div>}
        </div>
    );
};

const styles = {
    input: {
        backgroundColor: 'red'
    }
}

export default FileUploader;