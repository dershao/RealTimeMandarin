import numpy as np

def to_int(byte):
    """
        Converts a byte into an integer.
    """
    return int.from_bytes(byte, "big")


def import_dataset(path):
    """
        Parse binary for image RGB pixel values and label.

        For file format see: http://www.nlpr.ia.ac.cn/databases/handwriting/Home.html
    """
    file = open(path, "rb")

    images = []
    labels = []

    while True:
        
        sample_size = (to_int(file.read(1))&0x000000ff) | ((to_int(file.read(1)) & 0x000000ff)<<8) | ((to_int(file.read(1))&0x000000ff)<<16) | ((to_int(file.read(1))&0x000000ff)<<24)
        
        # if sample size is 0, we finished reading the file
        if sample_size == 0:
            break
        
        label = (to_int(file.read(1))&0x000000ff) | ((to_int(file.read(1))&0x000000ff)<<8)
        width = (to_int(file.read(1))&0x000000ff) | ((to_int(file.read(1))&0x000000ff)<<8)
        height = (to_int(file.read(1))&0x000000ff) | ((to_int(file.read(1))&0x000000ff)<<8)
        char = np.array(list(file.read(width * height)))

        images.append(char.reshape(height, width))
        labels.append(label)
    
    return images, np.array(labels)

