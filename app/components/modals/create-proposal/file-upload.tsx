import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

interface FileUploadProps {
  setValue: Function;
}

export const FileUpload: React.FC<FileUploadProps> = ({ setValue }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null); // Estado para o nome do arquivo

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name); // Armazena o nome do arquivo
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ result: { cid: string } }>(
        "https://api.alienworlds.io/workerproposal/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const cid = response.data.result.cid;
      setValue("url", cid);
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorResponse = error.response.data as string;
        const cid = errorResponse.slice(
          errorResponse.indexOf("Qm"),
          errorResponse.indexOf(" is")
        );
        if (cid) {
          setValue("url", cid);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <label className="flex items-center px-4 py-2 bg-[#00FFFF] text-black rounded-lg cursor-pointer hover:bg-black transition duration-300 hover:text-white hover:border-solid hover:border-white hover:border-[1px] border-[1px] border-[#00FFFF]">
        <FaUpload className="mr-2" />
        <span className="font-bold">
          {" "}
          {loading ? "Uploading..." : fileName || "Upload"}
        </span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

export default FileUpload;
