<?php
$ordinality=$_POST['ordinality'];
$name=$_POST['name'];
$size=$_POST['size'];
$distance=$_POST['distance'];
$description=$_POST['description'];

$list = array(
    $ordinality, $name, $size, $distance, $description
);
$string = $ordinality.",".$name.",".$size.",".$distance.",".$description;

$fileName = "planets.csv";
$temp = "temp.csv";

$inputFile = fopen($fileName, 'w+') or die("can't open file");
$outputFile = fopen($temp, 'w') or die("can't open file");

$foundRepeat = false;

while (false != ($stringLine = fgetcsv($inputFile))) {
    if ($stringLine[0] == $ordinality || $stringLine[1] == $name) {
        $stringLine[0] = $list[0];
        $stringLine[1] = $list[1];
        $stringLine[2] = $list[2];
        $stringLine[3] = $list[3];
        $stringLine[4] = $list[4];
        $foundRepeat = true;
    }
    fputcsv($outputFile, $stringLine);
}

// if file did not contain
if(!$foundRepeat) {
    fputcsv($outputFile, explode(',', $string));
}

fclose($inputFile);
fclose($outputFile);

unlink($fileName);
rename($temp, $fileName);


?>

echo "<script>window.close();</script>";


