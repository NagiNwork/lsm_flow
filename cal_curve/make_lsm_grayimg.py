import cv2
import numpy as np
import matplotlib.pyplot as plt

term = 3
threshold = 240
img_size = 400


def main():
    data_x = []
    data_y = []
    im = cv2.imread('../images/test4.jpg')
    h, w = im.shape[:2]
    if h > w:
        ratio = h/w
        im = cv2.resize(im, (img_size, int(img_size*ratio)))
    else:
        ratio = w/h
        im = cv2.resize(im, (int(img_size*ratio), img_size))
    im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    cv2.imwrite('../images/gray_ver.jpg', im_gray)
    y = 0
    for i in im_gray:
        x = 0
        for j in i:
            if j > threshold:
                if h > w:
                    data_x.append(x)
                    data_y.append(img_size * ratio - y)
                else:
                    data_x.append(x)
                    data_y.append(img_size - y)
            x += 1
        y += 1
    f = open("../data.txt", "w", encoding="utf-8")
    i = 0
    while i < term + 1:
        if i != 0:
            f.write("\n")
        if h > w:
            f.write(str(np.polyfit(data_y, data_x, term)[i]))
        else:
            f.write(str(np.polyfit(data_x, data_y, term)[i]))
        i += 1
    f.close()
    #disp_plt(data_x, data_y, ratio, im)

def disp_plt(x, y, ratio ,im):
    h, w = im.shape[:2]
    if h > w:
        coe = np.polyfit(y, x, term)
    else:
        coe = np.polyfit(x, y, term)
    curve_y = np.linspace(0, img_size * ratio, 300)
    curve_x = make_curve(curve_y, coe)
    
    
    if h > w:
        plt.figure(figsize=(6, 6 * ratio))
        plt.ylim(0, img_size*ratio)
        plt.xlim(0, img_size)
    else:
        plt.figure(figsize=(6 * ratio, 6))
        plt.ylim(0, img_size)
        plt.xlim(0, img_size*ratio)

    plt.scatter(x, y, color='blue', marker='o', s=2)
    plt.plot(curve_x, curve_y,c="red")
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.grid(True)
    plt.show()
    
def make_curve(curve, coe):
    num = 0
    ans = 0
    for i in coe:
        ans += curve**(len(coe) - num - 1) * i
        num += 1
    return ans

main() 