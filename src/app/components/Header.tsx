'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Header = ({
    fileName
}: {
    fileName: string
}) => {
    const [open, setOpen] = useState(false)
    function downloadDivAsImage(divId = 'qrCodeContainer', format = 'png') {

        const div = document.getElementById(divId);
        
        if (!div) {
          console.error(`Element with id "${divId}" not found`);
          toast.error('Unable to generate image. Please try again.');
          return;
        }
        
        // Use html2canvas to capture the div content
        html2canvas(div).then(canvas => {
          // Create a link element
          const link = document.createElement('a');
          
          // Set the download attribute and file name
          link.download = `${fileName}.${format}`;
          
          // Convert canvas to data URL in specified format
          let dataURL: string;
          switch(format.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
              dataURL = canvas.toDataURL('image/jpeg');
              break;
            case 'webp':
              dataURL = canvas.toDataURL('image/webp');
              break;
            default:
              dataURL = canvas.toDataURL('image/png');
          }
          
          // Set the href attribute to the image data
          link.href = dataURL;
          
          // Append link to body (required for Firefox)
          document.body.appendChild(link);
          
          // Trigger download
          link.click();
          
          // Clean up
          document.body.removeChild(link);
          
          toast.success('Image downloaded successfully!');
          setOpen(false)
        }).catch(error => {
          console.error('Error generating image:', error);
          toast.error('Failed to generate image. Please try again.');
        });
      }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Download Image
                </DialogTitle>
                <DialogDescription>
                <div className="flex items-center space-x-2">Choose The Format of the Image</div>
            </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-2'>
                <Button className='w-full text-align-start mr-auto' variant="ghost" onClick={() => downloadDivAsImage('ss', 'png')}>PNG</Button>
                <Button className='w-full text-align-start mr-auto' variant="ghost" onClick={() => downloadDivAsImage('ss', 'jpg')}>JPG</Button>
                <Button className='w-full text-align-start mr-auto' variant="ghost" onClick={() => downloadDivAsImage('ss', 'webp')}>WEBP</Button>
            </div>
        </DialogContent>
    </Dialog>
    <nav className="z-[999] border-b border-gray-300 dark:border-[#1a1a1a] bg-white dark:bg-[#1a1a1a] sticky top-0 w-[100vw] h-[56px] shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a className="md:flex items-center" href="https://www.picyard.in/logo.png">
          <img src="https://www.picyard.in/logo.png" className="h-10 mr-3 rounded-lg shadow-md transform transition-transform hover:rotate-0 -rotate-6" alt="Picyard logo"/>
        </a>
        <div className="flex items-center space-x-2">
          <button type="button" className="text-sm text-white px-4 py-1 flex items-center rounded-lg font-medium bg-black dark:bg-[#3b3939] dark:text-gray-100 transition-transform transform hover:scale-105 hover:bg-gray-800 dark:hover:bg-[#4a4848] "
            onClick={() => setOpen(true)}
          >
            <span>Save</span>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ml-2 mt-[1px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <title>temp3</title>
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center md:order-2">
          <a className="border text-xs text-gray-600 dark:text-gray-300 py-1 px-3 rounded-lg hidden sm:flex dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-[#121212] transition-all" href="/">View all templates</a>
          <div className="ml-2">
            <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 dark:bg-gray-950 border-none">
              <title>temp3</title>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                <title>temp2</title>
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                <title>temp</title>
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header