<?php

namespace App\Enums;

enum ShipmentStatus: string
{
    case ISSUED = "issued";
    case PROGRESS = "progress";
    case FINISHED = "finished";
    case FAILED = "failed";
}
