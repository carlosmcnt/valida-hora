import { useState } from "react";

export const handleFileChange = (event) => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Atualiza o nome do arquivo
        }
    }
    return fileName;
};