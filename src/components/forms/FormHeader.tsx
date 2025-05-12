
interface FormHeaderProps {
  title: string;
  subtitle: string;
}

const FormHeader = ({ title, subtitle }: FormHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-brand-dark">
        {title}
      </h2>
      <p className="text-gray-600 mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default FormHeader;
