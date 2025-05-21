interface FormHeaderProps {
  title: string;
  subtitle: string;
}
const FormHeader = ({
  title,
  subtitle
}: FormHeaderProps) => {
  return <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-brand-dark">
        {title}
      </h2>
      <p className="mt-2 text-slate-50 text-base font-extralight">
        {subtitle}
      </p>
    </div>;
};
export default FormHeader;