
// app/routes/app/company-gpt.tsx
import { useState } from "react";
import { Clipboard, Download } from "lucide-react"; // Import icons
import AppLayout from "~/components/layout/AppLayout";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function TextEmbedPage() {
  const [inputText, setInputText] = useState("");
  const [onPremEmbedding, setOnPremEmbedding] = useState<number[] | null>(null);
  const [azureEmbedding, setAzureEmbedding] = useState<number[] | null>(null);
  const [loading, setLoading] = useState({ onPrem: false, azure: false });

  const getOnPremEmbedding = async () => {
    try {
      setLoading((prev) => ({ ...prev, onPrem: true }));
      const response = await fetch(
        `http://localhost:8000/get-on-prem-text_embedding?text=${encodeURIComponent(inputText)}`
      );
      const data = await response.json();
      setOnPremEmbedding(data.embedding);
    } catch (error) {
      console.error("Error fetching on-prem embedding:", error);
    } finally {
      setLoading((prev) => ({ ...prev, onPrem: false }));
    }
  };

  const getAzureEmbedding = async () => {
    try {
      setLoading((prev) => ({ ...prev, azure: true }));
      const response = await fetch("http://localhost:8000/get-azure-embedding/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setAzureEmbedding(data.embedding);
    } catch (error) {
      console.error("Error fetching Azure embedding:", error);
    } finally {
      setLoading((prev) => ({ ...prev, azure: false }));
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    await Promise.all([getOnPremEmbedding(), getAzureEmbedding()]);
  };

  const copyToClipboard = (embedding: number[] | null) => {
    if (!embedding) return;
    navigator.clipboard.writeText(JSON.stringify(embedding, null, 2));
    alert("Copied to clipboard!");
  };

  const downloadEmbedding = (embedding: number[] | null, type: string) => {
    if (!embedding) return;
    const blob = new Blob([JSON.stringify(embedding, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_embedding.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderEmbeddingPreview = (embedding: number[] | null, type: string) => {
    if (!embedding) return null;
    const preview = embedding.slice(0, 5).map((n) => n.toFixed(6)).join(", ");

    return (
      <div className="text-sm">
        <span>[{preview}, ...]</span>
        <div className="text-gray-500 mt-1">Dimension: {embedding.length}</div>
        <div className="mt-2 flex space-x-2">
          <Button
            size="sm"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
            onClick={() => copyToClipboard(embedding)}
          >
            <Clipboard size={16} /> Copy
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md"
            onClick={() => downloadEmbedding(embedding, type)}
          >
            <Download size={16} /> Download
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-cyan-500">Text Embeddings Generator</h2>

        <Card className="p-6 mb-6">
          <Textarea
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            className="min-h-[100px] mb-4"
          />
          <Button
            onClick={handleSubmit}
            disabled={!inputText.trim() || loading.onPrem || loading.azure}
            className="w-full"
          >
            Generate Embeddings
          </Button>
        </Card>

        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Results Overview</TabsTrigger>
            <TabsTrigger value="raw">Raw Vectors</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">On-Prem Embedding</h3>
                {loading.onPrem ? (
                  <div className="text-gray-500">Loading...</div>
                ) : (
                  renderEmbeddingPreview(onPremEmbedding, "on-prem")
                )}
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Azure Embedding</h3>
                {loading.azure ? (
                  <div className="text-gray-500">Loading...</div>
                ) : (
                  renderEmbeddingPreview(azureEmbedding, "azure")
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="raw">
            <div className="grid grid-cols-1 gap-4 text-black">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Full Vectors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">On-Prem</h4>
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-[200px]">
                      {onPremEmbedding ? JSON.stringify(onPremEmbedding, null, 2) : "No data"}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Azure</h4>
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-[200px]">
                      {azureEmbedding ? JSON.stringify(azureEmbedding, null, 2) : "No data"}
                    </pre>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
