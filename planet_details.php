<?php

if(isset($_GET["id"])) {
    $ordinality = $_GET["id"];
}

if(file_exists("planets.csv")) {
    $planetFile = file('planets.csv');
}
$planetData[] = [];
foreach ($planetFile as $planetLine) {
    $planetData[] = str_getcsv($planetLine);
    if ($planetLine[0] == $ordinality) {
        list($ord, $name, $size, $dist, $description) = explode(',', $planetLine);
    }
}

?>

<html>
<body>
<?php echo $name; ?><br/>
<?php echo $description; ?><br/><br/>
Ordinality: <?php echo $ord; ?><br/>
Size: <?php echo $size; ?> Earth Masses <br/>
Distance: <?php echo $dist; ?> AU

</body>
</html>

