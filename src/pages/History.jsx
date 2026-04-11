import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function History() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const userEmail = user?.email || "guest";
        const data = JSON.parse(localStorage.getItem(`jurnal_data_${userEmail}`)) || [];
        setLogs(data.reverse()); // Data terbaru di atas
    }, [user]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-green-800">Riwayat Jurnal</h1>
                <button onClick={() => navigate("/dashboard")} className="bg-gray-600 text-white px-4 py-2 rounded font-bold">Kembali</button>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-green-50">
                    <tr>
                        <th className="p-3 border">Waktu</th>
                        <th className="p-3 border">Aktivitas</th>
                        <th className="p-3 border">Tindakan</th>
                        <th className="p-3 border">Berat</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id} className="border-b">
                            <td className="p-3">{new Date(log.id).toLocaleString('id-ID')}</td>
                            <td className="p-3">{log.aktivitas}</td>
                            <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{log.tindakan}</span></td>
                            <td className="p-3 font-bold">{log.berat} {log.beratSatuan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}