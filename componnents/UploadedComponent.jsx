/*import React, { useState } from 'react';

//import { createClient } from '@supabase/supabase-js'

import Constants from 'expo-constants';

const { supabaseUrl, supabaseAnonKey, bucketName } = Constants.easConfig.extra;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FileUploader = () => {
    const [uploading, setUploading] = useState(false);

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

            alert(`Archivo subido con éxito: ${`${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`}`);
        } catch (error) {
            alert(`Error al subir el archivo: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" disabled={uploading} onChange={handleFileChange} />
            {uploading && <p>Subiendo archivo...</p>}
        </div>
    );
};

export default FileUploader;*/