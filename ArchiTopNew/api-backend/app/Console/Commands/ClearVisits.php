<?php

namespace App\Console\Commands;

use App\Models\Visit;
use Illuminate\Console\Command;

class ClearVisits extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'app:clear-visits';
    protected $signature = 'visits:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete visits older than 30 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Visit::where('created_at', '<', now()->subDays(30))->delete();
        $this->info('Old visits cleared.');
    }
}
