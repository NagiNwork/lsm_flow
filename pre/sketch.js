let img;
let coe;
//frame_x : height of the frame
//frame_y : width of the frame
let frame_x,frame_y;
let input;

// Load.
function preload() {
		// select image name
    img = loadImage('../images/gray_ver.jpg');
		//Select make_lsm_grayimg.py execution result
    coe = loadStrings('../data.txt');
}

function setup(){
    createCanvas(1000, 1000);
    background(200);
    noStroke();
    frame_x = 5 / (4 * 2.828) * img.height - (img.width / 2);
    frame_y = img.height / 8;

    //select color
    //1
    textSize(12);
    text('Color1', img.width + 2 * frame_x + 10, 10);
    textSize(10);
    text('🔴', img.width + 2 * frame_x + 10, 22.5);
    r_slider1 = createSlider(0, 255, 230);
    r_slider1.position(img.width + 2 * frame_x + 30, 10);

    textSize(10);
    text('🟢', img.width + 2 * frame_x + 10, 42.5);
    g_slider1 = createSlider(0, 255, 230);
    g_slider1.position(img.width + 2 * frame_x + 30, 30);

    textSize(10);
    text('🔵', img.width + 2 * frame_x + 10, 62.5);
    b_slider1 = createSlider(0, 255, 230);
    b_slider1.position(img.width + 2 * frame_x + 30, 50);

    //2
    textSize(12);
    text('Color2', img.width + 2 * frame_x + 10, 90);
    
    textSize(10);
    text('🔴', img.width + 2 * frame_x + 10, 102.5);
    r_slider2 = createSlider(0, 255, 230);
    r_slider2.position(img.width + 2 * frame_x + 30, 90);

    textSize(10);
    text('🟢', img.width + 2 * frame_x + 10, 122.5);
    g_slider2 = createSlider(0, 255, 230);
    g_slider2.position(img.width + 2 * frame_x + 30, 110);

    textSize(10);
    text('🔵', img.width + 2 * frame_x + 10, 142.5);
    b_slider2 = createSlider(0, 255, 230);
    b_slider2.position(img.width + 2 * frame_x + 30, 130);

    //3
    textSize(12);
    text('Color3', img.width + 2 * frame_x + 10, 170);

    textSize(10);
    text('🔴', img.width + 2 * frame_x + 10, 182.5);
    r_slider3 = createSlider(0,255, 230);
    r_slider3.position(img.width + 2 * frame_x + 30, 170);

    textSize(10);
    text('🟢', img.width + 2 * frame_x + 10, 202.5);
    g_slider3 = createSlider(0, 255, 230);
    g_slider3.position(img.width + 2 * frame_x + 30, 190);

    textSize(10);
    text('🔵', img.width + 2 * frame_x + 10, 222.5);
    b_slider3 = createSlider(0, 255, 230);
    b_slider3.position(img.width + 2 * frame_x + 30, 210);

    //relocation circle button
    let button = createButton('generate');
    button.position(img.width + 2 * frame_x + 20, 280);
    button.mousePressed(gen_img);

    //save image button
    let save_button = createButton('save image');
    save_button.position(img.width + 2 * frame_x + 20, 310);
    save_button.mousePressed(save_image);

    //input text
    input = createInput('');
    input.position(img.width + 2 * frame_x + 20, 250);
    input.input(gen_img);

    gen_img();
}

//generate image
function gen_img(){
    draw_frame();
    draw_cir();
    typo();
}

//Draw a circle following the least squares method.
function draw_cir(){
    image(img, frame_x, frame_y, image.width, image.height);

    let dif,dia,c,a;
    //draw circle
    for(let i = 0;i < img.height;i++){
        if(img.width < img.height){
            dif = random(-img.width / 8, img.width / 8);
            dia = random(img.width / 40, img.width / 8)
        }
        x = 0;
        for(let j = 0;j < coe.length;j++){
            x += (img.height-i)**(coe.length - j - 1) * float(coe[j]);
        }

        a = random(0,9) % 2;
        a = Math.round(a);
        
        if(a == 0){
            c = color(r_slider1.value(), g_slider1.value(), b_slider1.value());
        }else if(a == 1){
            c = color(r_slider2.value(), g_slider2.value(), b_slider2.value());
        }else if(a == 2){
            c = color(r_slider3.value(), g_slider3.value(), b_slider3.value());
        }else{
            c = color(255, 255, 255);
        }

        if(i % int(8 * img.width/200) == 0 && x + dif < img.width && i + dif < img.height){
            fill(c);
            circle(x + dif + frame_x, i + dif + frame_y, dia);
        }
    }
}

//draw frame
function draw_frame(){
    fill(250);
    beginShape();
        vertex(0, 0);
        vertex(img.width + 2 * frame_x, 0);
        vertex(img.width + 2 * frame_x, img.height + 2 * frame_y);
        vertex(0, img.height + 2 * frame_y)
    endShape(CLOSE);
}

function typo(){
    let size = 12;
    let title = input.value();
    fill(0);
    textStyle(BOLD);
    textSize(size * 6);
    textAlign(LEFT, CENTER);
    text(title,size * 3,frame_y);
    
    textStyle(NORMAL);
    textSize(size);
    textAlign(RIGHT, TOP);
    text(year()+"."+month() + "." + day(), img.width + frame_x,size + frame_y + img.height);
}

//save result image
function save_image(){
    let result_img = get(0, 0, img.width + 2 * frame_x, img.height + 2 * frame_y);
    save(result_img, 'result.png');
}