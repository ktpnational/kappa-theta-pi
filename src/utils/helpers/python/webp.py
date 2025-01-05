import os
import subprocess
from pathlib import Path
from concurrent.futures import Future, ThreadPoolExecutor, as_completed
from time import perf_counter
import shutil
import logging
from typing import List, Set

# Constants
EXTENSIONS: tuple[str, ...] = (".png", ".jpg", ".jpeg")
QUALITY: int = 100

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


def get_images(directory: Path) -> List[Path]:
    """Get all images in the directory with the specified extensions."""
    try:
        # Debug: Print the current directory
        logging.info("Scanning directory: %s", directory)

        # Debug: List all files in the directory
        all_files: List[Path] = list(directory.iterdir())
        logging.info("All files in directory: %s", [f.name for f in all_files])

        # Filter images with the specified extensions
        images: List[Path] = [
            image for image in all_files if image.suffix.lower() in EXTENSIONS
        ]
        logging.info("Found images: %s", [img.name for img in images])

        return images
    except (FileNotFoundError, PermissionError) as e:
        logging.error("Error getting images: %s", e)
        return []


def convert_to_webp(image: Path) -> None:
    """Convert an image to WebP format using cwebp."""
    try:
        output_file: Path = image.with_suffix(".webp")
        if not shutil.which("cwebp"):
            logging.error("cwebp is not installed")
            return
        command: List[str] = [
            "cwebp",
            "-q",
            str(QUALITY),
            str(image),
            "-o",
            str(output_file),
        ]
        result: subprocess.CompletedProcess[str] = subprocess.run(
            command, capture_output=True, text=True, check=True
        )
        if result.returncode != 0:
            logging.error("Error converting %s: %s", image.name, result.stderr.strip())
        else:
            logging.info("Converted %s to %s", image.name, output_file.name)
    except (subprocess.CalledProcessError, FileNotFoundError, PermissionError) as e:
        logging.error("Error converting %s: %s", image.name, e)


def get_missing_images(directory: Path, original_images: List[Path]) -> List[Path]:
    """Get images that do not have a corresponding WebP file."""
    try:
        webp_files: Set[str] = {
            file.stem for file in directory.iterdir() if file.suffix.lower() == ".webp"
        }
        return [image for image in original_images if image.stem not in webp_files]
    except (FileNotFoundError, PermissionError) as e:
        logging.error("Error checking for missing images: %s", e)
        return []


def main() -> None:
    """Main function to convert images to WebP format."""
    # Set the working directory to the script's directory
    script_dir: Path = Path(__file__).parent.absolute()
    os.chdir(script_dir)

    # Debug: Print the script's directory
    logging.info("Script directory: %s", script_dir)

    original_images: List[Path] = get_images(script_dir)

    if not original_images:
        logging.info("No images found in the directory.")
        return

    missing_images: List[Path] = get_missing_images(script_dir, original_images)

    if missing_images:
        logging.info(
            "Found %s missing WebP conversions. Starting conversion...",
            len(missing_images),
        )
    else:
        logging.info("No missing WebP conversions found. Converting all images...")
        missing_images = original_images

    start_time: float = perf_counter()

    # Use ThreadPoolExecutor for parallel conversion
    with ThreadPoolExecutor() as executor:
        futures: List[Future[None]] = [
            executor.submit(convert_to_webp, image) for image in missing_images
        ]
        for future in as_completed(futures):
            future.result()  # Wait for each task to complete

    elapsed_time: float = perf_counter() - start_time
    logging.info("Task completed in %.4f seconds", elapsed_time)


if __name__ == "__main__":
    main()
