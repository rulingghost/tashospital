import React from 'react'

const FaceSchema = ({values, setFieldValue}) => {

  return (
    <svg width="100%" height="100%" viewBox="0 0 740 925" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect id="face 1" width="740" height="925" fill="none"/>
        <path 
            id="Vector 18" d="M229.5 753.5L223.5 711C244.081 724.672 256.302 733.748 282 758C306.578 777.002 321.664 783.159 350.5 787.5C364.763 789.891 376.363 786.523 396.5 785C416.637 783.477 441.17 773.472 516 708.5C510.792 729.514 507.82 742.372 509.5 758C521.382 818.749 531.701 844.554 561 866C409.594 905.572 324.986 911.123 175 866C206.275 839.62 219.683 817.577 229.5 753.5Z" 
            onClick={() => { if (setFieldValue) {setFieldValue("neck", !values.neck)} }}
            style={{fill: values.neck ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 1" d="M460.5 389.5L403.5 408C398.935 390.39 400.182 382.21 414.5 373C453.414 348.198 475.572 342.365 516 353.5C536.792 361.462 544.192 370.153 551.5 391.5L549 389.5C529.924 375.383 515.087 375.05 484.5 382L460.5 389.5Z"
            onClick={() => { if (setFieldValue) {setFieldValue("right_eyebrow", !values.right_eyebrow)} }}
            style={{fill: values.right_eyebrow ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 3" d="M281.572 389.473L337.677 408C342.171 390.364 340.942 382.172 326.85 372.948C288.546 348.11 266.736 342.268 226.943 353.42C206.477 361.393 199.194 370.097 192 391.476L194.461 389.473C213.237 375.335 227.842 375.001 257.948 381.962L281.572 389.473Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("left_eyebrow", !values.left_eyebrow)} }}
            style={{fill: values.left_eyebrow ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 6" d="M349 616.5C315.231 630.509 302.492 641.307 284 661.5L338 657L352.5 659.5C364.599 658.864 371.258 658.928 383 659.5L403.5 657L450.5 659.5H457.5C443.404 637.659 427.978 625.279 391 616.5C383.844 621.981 379.114 623.917 369.5 625.5C361.669 623.9 357.088 621.706 349 616.5Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("upper_lip", !values.upper_lip)} }}
            style={{fill: values.upper_lip ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 5" d="M450.5 659.5H457.5C446.646 672.034 439.926 679.994 426 691C403.506 701.055 389.826 704.874 361.5 705C345.728 703.932 337.343 702.298 323 698C302.529 687.801 294.726 679.24 284 661.5L338 657C343.329 657.629 346.587 658.262 352.5 659.5C364.599 658.864 371.258 658.928 383 659.5L403.5 657L450.5 659.5Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("lower_lip", !values.lower_lip)} }}
            style={{fill: values.lower_lip ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 7" d="M405.5 516C397.385 489.172 396.038 473.191 395.5 444C376.56 440.695 365.94 440.472 347 444C346.228 472.408 344.857 488.243 337.5 516C333.17 526.58 330.373 532.626 323.5 544C318.393 558.506 318.724 564.284 323.5 571.5C331.396 576.631 335.4 580.722 341.5 591C363.315 588.76 376.26 588.808 400.5 591C405.467 581.629 408.857 576.749 420.5 571.5C423.651 564.545 424 555 420.5 546.5C412.572 536.272 409.491 529.429 405.5 516Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("nose", !values.nose)} }}
            style={{fill: values.nose ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 8" d="M598.5 551C589.87 563.489 584.074 567.777 573 569.5C586.192 476.358 594.215 426.857 609 418.5C622.157 411.376 626.619 415.911 631.5 429.5C629.726 445.427 628.492 454.26 625 469.5L616 513.5C608.352 535.693 604.741 540.849 598.5 551Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("right_ear", !values.right_ear)} }}
            style={{fill: values.right_ear ? "#06b5d45b" : "transparent", stroke: "black"}}
            />
        <path 
            id="Vector 9" d="M160 529.5L149 476.5L128 417.5C117.747 411.723 112.629 411.838 106.5 428C105.647 436.593 106.487 445.216 113.5 476.5L122 514.5C128.585 534.834 133.144 543.596 142.5 555.5C148.866 564.342 153.397 568.012 166 568.5L160 529.5Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("left_ear", !values.left_ear)} }}
            style={{fill: values.left_ear ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 10" d="M336.5 465C263.095 479.119 231.614 476 189 455C186.358 461.551 186.086 466.424 188 477.5C193.409 489.538 197.987 495.964 213 506C234.022 517.958 247 520.831 272 520C293.771 514.544 304.846 508.999 322.5 494.5C327.606 483.136 330.721 476.655 336.5 465Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("left_under_eye", !values.left_under_eye)} }}
            style={{fill: values.left_under_eye ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 11" d="M482.5 473C448.191 471.759 430.703 469.656 402.5 463.5C408.287 474.336 411.537 480.559 417.5 496C424.548 502.849 429.061 506.495 440 512C461.803 520.702 475.901 522.134 505.5 516.5C526.201 509.759 538.326 507.713 552 477.5C553.715 470.09 553.322 465.773 552 458C524.918 468.505 509.701 471.841 482.5 473Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("right_under_eye", !values.right_under_eye)} }}
            style={{fill: values.right_under_eye ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 12" d="M258.5 225C213.106 249.031 198.064 266.038 177.5 298.5L164 336.5C165.462 351.79 175.473 360.352 188.5 367C240.203 333.47 266.231 326.735 335 361H399C462.521 332.833 495.181 330.651 546 361C560.35 357.815 565.161 356.307 572 343.5L563 310.5C538.43 265.284 515.656 248.047 466.5 225C387.244 202.786 342.027 199.137 258.5 225Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("forehead", !values.forehead)} }}
            style={{fill: values.forehead ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 13" d="M581.5 367C569.666 363.919 563.825 366.367 554.5 376.5V376.5C554.5 399.5 554.5 418.5 560 441.5C560.554 450.474 566.31 450.318 576.5 450.5C586.843 448.601 589.561 442.942 592.5 430C591.45 400.32 590.838 383.715 581.5 367Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("right_temple", !values.right_temple)} }}
            style={{fill: values.right_temple ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 14" d="M184.5 391C173.442 375.339 165.228 372.054 149 370.5C145.416 387.951 144.006 398.243 145.5 420C147.753 439.639 149.686 450.35 157.5 467.5C170.233 465.612 176.203 461.701 184.5 449C188.471 423.279 187.898 411.023 184.5 391Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("left_temple", !values.left_temple)} }}
            style={{fill: values.left_temple ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 15" d="M394 786.5L352 788C321.972 782.805 308.184 776.382 287 761C284.337 752.947 285.123 748.807 287 741.5L344.5 714C364.511 705.62 375.4 704.988 394 714L455 738.5C456.714 745.985 457.05 749.945 455 756C433.852 774.624 420.573 780.15 394 786.5Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("chin", !values.chin)} }}
            style={{fill: values.chin ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 16" d="M481.5 528.5C462.855 529.955 454.227 533.193 441.5 542.5C441.986 560.4 442.916 570.403 449.5 588C453.366 602.892 456.714 610.951 464 625L470.5 692C473.748 698.743 476.307 701.515 484.5 701.5C503.207 695.671 512.739 690.242 527.5 675.5C544.6 662.32 552.289 651.106 559 617C563.631 595.416 565.129 582.348 561.5 553.5C556.999 539.397 551.122 534.362 537 528.5C519.344 525.928 507.65 525.635 481.5 528.5Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("right_cheek", !values.right_cheek)} }}
            style={{fill: values.right_cheek ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
        <path 
            id="Vector 17" d="M260.714 528.087C280.424 529.575 289.546 532.886 303 542.403C302.487 560.708 301.503 570.938 294.543 588.933C290.456 604.162 286.916 612.403 279.214 626.769L272.342 695.285C268.909 702.181 266.204 705.015 257.542 705C237.766 699.039 227.689 693.487 212.085 678.412C194.007 664.934 185.879 653.466 178.784 618.589C173.889 596.516 172.305 583.153 176.141 553.652C180.899 539.23 187.112 534.082 202.042 528.087C220.707 525.456 233.069 525.157 260.714 528.087Z"
            stroke="black"
            onClick={() => { if (setFieldValue) {setFieldValue("left_cheek", !values.left_cheek)} }}
            style={{fill: values.left_cheek ? "#06b5d45b" : "transparent", stroke: "black"}}
        />
    </svg>

  )
}

export default FaceSchema