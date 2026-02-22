import { useState } from 'react';
import { API_BASE } from '@/api/config';

export function AssetsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    setMessage('');

    const formData = new FormData();
    formData.append('asset', file);

    try {
      const res = await fetch(`${API_BASE}/assets`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(`Uploaded: ${data.url ?? data.id ?? 'OK'}`);
        setFile(null);
      } else {
        setStatus('error');
        setMessage(data.message ?? 'Upload failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Upload Asset</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="asset" className="block text-sm font-medium text-slate-700">
            File (GLB, texture, pano)
          </label>
          <input
            id="asset"
            type="file"
            accept=".glb,.gltf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!file || status === 'uploading'}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
        >
          {status === 'uploading' ? 'Uploading…' : 'Upload'}
        </button>
        {message && (
          <p
            className={`text-sm ${status === 'success' ? 'text-emerald-600' : status === 'error' ? 'text-rose-600' : ''}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
