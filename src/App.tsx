import * as z from 'zod';
import { fileUploadSchema, orderSchema, productSchema, profileSchema, userSchema , comprehensiveTestSchema  } from './common/form/util/schemas';
import { DynamicForm, DynamicFormDemo } from './common/form';
import { TestForm } from './common/form/TestForm';

const TestFormPage = () => {
  const handleSubmit = (data: z.infer<typeof comprehensiveTestSchema>) => {
    console.log('Submitted data:', data);
  };


  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dynamic Form Test</h1>
      <DynamicForm schema={comprehensiveTestSchema} onSubmit={handleSubmit} />
      {/* <DynamicFormDemo/> */}
      <TestForm/>
    </div>
  );
};

export default TestFormPage;