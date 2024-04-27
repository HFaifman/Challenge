import { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "@/components/ui/label";
import getHash from "./exercises/urlParser";
import { Button } from "./components/ui/button";

function App() {
  const [values, setValues] = useState({
    format: "",
    instance: "",
  });

  const [parsedURL, setParsedURL] = useState({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { format, instance } = values;
    e.preventDefault();
    if (instance && format) {
      setParsedURL(getHash(format, instance));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="w-full h-full flex flex-col gap-4 p-8"
      onSubmit={handleSubmit}
    >
      <Label className="text-white" htmlFor="format">
        Format
      </Label>
      <Input
        id="format"
        name="format"
        value={values.format}
        onChange={handleChange}
        className="w-60"
      />
      <Label className="text-white" htmlFor="instance">
        Instance
      </Label>
      <Input
        id="instance"
        name="instance"
        value={values.instance}
        onChange={handleChange}
        className="w-60"
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
      <p className="text-white">
        {Object.values(parsedURL).length > 0 && JSON.stringify(parsedURL)}
      </p>
    </form>
  );
}

export default App;
