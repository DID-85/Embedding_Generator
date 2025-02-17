interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      {...props}
    />
  );
} 