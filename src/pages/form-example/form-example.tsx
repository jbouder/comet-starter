import { Button, FileInput, Form, useFileInput } from '@metrostar/comet-uswds';
import { useEffect, useState } from 'react';

export const FormExample = (): React.ReactElement => {
  const { clear } = useFileInput();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>Form Example</h1>
          <Form id="form">
            <FileInput
              id="file-input"
              onChange={() => {
                const input = document.getElementById(
                  'file-input',
                ) as HTMLInputElement;
                const files = input?.files;
                if (files) {
                  setFile(files[0]);
                }
              }}
            />
            <Button
              id="clear-btn"
              onClick={() => {
                clear('file-input');
                setFile(null);
              }}
            >
              Clear
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
