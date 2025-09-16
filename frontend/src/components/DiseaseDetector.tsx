import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function DiseaseDetector() {
  // State to hold the selected file and its preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // State for the prediction result, loading status, and any errors
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle file selection from the input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear previous results when a new file is selected
    setPrediction(null);
    setError(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      // Create a temporary URL to display the image preview
      setPreview(URL.createObjectURL(file));
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // API call to your Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error. Please try again later.");
      }

      const result = await response.json();
      
      if (result.error) {
         setError(result.error);
      } else {
        setPrediction(result.prediction);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section id="detect" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Detect Disease</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload an image of a plant leaf, and our AI will analyze it for common diseases. Get instant results and protect your crops.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl items-center gap-6 py-12">
           <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload Leaf Image</CardTitle>
              <CardDescription>
                Our AI will analyze the image and predict the plant's condition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="picture">Plant Leaf Image</Label>
                  <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                {preview && (
                  <div className="mt-4 flex flex-col items-center">
                    <p className="font-medium mb-2">Image Preview:</p>
                    <img src={preview} alt="Selected leaf" className="rounded-md max-h-60 border" />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || !selectedFile}>
                  {isLoading ? "Analyzing..." : "Get Prediction"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* --- Results Display --- */}
          {error && (
              <Alert variant="destructive" className="mt-6">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
          
          {prediction && (
              <Card className="mt-6">
                  <CardHeader>
                      <CardTitle>Analysis Complete</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-lg">
                        <strong>Prediction:</strong> 
                        <span className="text-primary font-semibold ml-2">{prediction}</span>
                      </p>
                  </CardContent>
              </Card>
          )}
        </div>
      </div>
    </section>
  )
}