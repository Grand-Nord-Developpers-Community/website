import { useEffect, useRef, useState } from "react";
import Script from "./script";
import {
  CloudinaryInstance,
  UploadWidgetError,
  UploadWidgetInstance,
  UploadWidgetProps,
  UploadWidgetResults,
} from "./upload-widget.type";

const UploadWidget = ({ children, onSuccess, onError }: UploadWidgetProps) => {
  const cloudinary = useRef<CloudinaryInstance>();
  const widget = useRef<UploadWidgetInstance>();

  const [isScriptLoading, setIsScriptLoading] = useState(true);

  const uploadOptions = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    sources: [
        "local",
        "url",
        "camera",
        "google_drive",
        "unsplash",
        "shutterstock",
        "istock",
        "image_search"
    ],
    //googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#ffffff",
            sourceBg: "#f4f4f5",
            windowBorder: "#90a0b3",
            tabIcon: "#0A436B",
            inactiveTabIcon: "#555a5f",
            menuIcons: "#555a5f",
            link: "#BF8440",
            action: "#339933",
            inProgress: "#0433ff",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd"
        },
        fonts: {
            default: null,
            "'Poppins', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Poppins",
                active: true
            }
        }
    }
  };

  function handleOnLoad() {
    setIsScriptLoading(false);

    // Store the Cloudinary window instance to a ref when the page renders

    if (!cloudinary.current && typeof window) {
      cloudinary.current = (window as any).cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to
    // setTimeout: https://caniuse.com/requestidlecallback

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);
  }

  useEffect(() => {
    return () => {
      widget.current?.destroy();
      widget.current = undefined;
      cloudinary.current = undefined;
    };
  }, []);

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    return cloudinary.current?.createUploadWidget(
      uploadOptions,
      function (error: UploadWidgetError, result: UploadWidgetResults) {
        if (error && typeof onError === "function") {
          onError(error, widget.current);
        }

        if (result.event === "success" && typeof onSuccess === "function") {
          onSuccess(result, widget.current);
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return (
    <>
      {typeof children === "function" && children({ cloudinary, widget, open })}
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        onLoad={handleOnLoad}
        onError={() => console.error(`Failed to load Cloudinary Upload Widget`)}
      />
    </>
  );
};

export default UploadWidget;
