import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';

export function generateResumePDF(resumeRef) {
  // Get the actual DOM element that contains the resume
  const element = resumeRef.current;
  
  if (!element) {
    console.error('Resume element reference not found');
    return;
  }
  
  // Configuration options
  const options = {
    margin: 10,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };
  
  // Generate PDF directly from the HTML element
  html2pdf().from(element).set(options).save();
}

// Alternative implementation using html2canvas + jsPDF if html2pdf.js doesn't meet your needs
export function generateResumePDFAlternative(resumeRef) {
  const element = resumeRef.current;
  
  if (!element) {
    console.error('Resume element reference not found');
    return;
  }
  
  const options = {
    scale: 2,
    useCORS: true,
    logging: false,
    letterRendering: true
  };
  
  html2canvas(element, options).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10; // Top margin
    
    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('resume.pdf');
  });
}

// Example usage in a React component
// function ResumeComponent() {
//   const resumeRef = useRef(null);
//
//   const handleDownloadPDF = () => {
//     generateResumePDF(resumeRef);
//   };
//
//   return (
//     <>
//       <div ref={resumeRef} className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
//         {/* Your resume content here */}
//       </div>
//       <button onClick={handleDownloadPDF}>Download PDF</button>
//     </>
//   );
// }