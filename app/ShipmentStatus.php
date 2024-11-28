<?php

namespace App;

enum ShipmentStatus: string
{
    case ISSUED = "issued";
    case PROGRESS = "progress";
    case FINISHED = "finished";
    case FAILED = "failed";
}
