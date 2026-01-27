import { uploadCSV } from "../services/api";
import { useUser } from "@clerk/clerk-react";
function UploadCSV({ setSummary, onUploadSuccess }) {
    const { isSignedIn } = useUser();
    if (!isSignedIn) return null;


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const res = await uploadCSV(file);
            setSummary(res.data);
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (err) {
            if (err.response?.status === 409) {
                alert("Dataset already uploaded");
            } else {
                alert("Upload failed");
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
            <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Upload CSV File
            </label>
            <input
                type="file"
                accept=".csv"
                className="block w-full text-sm text-gray-600"
                onChange={handleUpload}
            />
        </div>
    );
}
export default UploadCSV;