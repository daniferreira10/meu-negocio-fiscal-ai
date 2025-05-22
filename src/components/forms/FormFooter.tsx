
interface FormFooterProps {
  text?: string;
  linkText?: string;
  href?: string;
}

const FormFooter = ({ 
  text = "Ao fazer login, você concorda com nossos Termos de Serviço e Política de Privacidade.",
  linkText,
  href
}: FormFooterProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-xs text-gray-500 text-center">
        {text.includes("Termos") && !linkText ? (
          <>
            {text.split("Termos")[0]}
            <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e{" "}
            <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>.
          </>
        ) : linkText ? (
          <>
            {text} <a href={href || "#"} className="text-brand-blue hover:underline">{linkText}</a>
          </>
        ) : text}
      </p>
    </div>
  );
};

export default FormFooter;
