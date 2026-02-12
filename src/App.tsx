import * as z from 'zod';
import { comprehensiveTestSchema } from './common/form/util/schemas';
import { DynamicForm } from './common/form';
import { TestForm } from './common/form/TestForm';
import { Toaster } from 'sonner';

const TestFormPage = () => {
  const handleSubmit = () => {
    // Submit handling
  };


  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 font-bold">Dynamic Form Test</h1>
      <DynamicForm schema={comprehensiveTestSchema} onSubmit={handleSubmit} />
      <TestForm />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default TestFormPage;