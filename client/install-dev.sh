#!/bin/bash

# Saifco Deployment Server

    # Assign Current workdir
    mainDir=$PWD

            # Echo the Status
        echo -e "\n \t Installing Server..."

    npm install &

    wait

    # Define the service Directory array
    serviceArray=( 'client-admin' 'client-user' 'client-warehouse' )

    # Loop through all the directories and install the packages 
    for i in "${serviceArray[@]}"
    do

        # Go to service directory
        cd $i

        service="$(cut -d- -f2 <<< "$i")"

        # Echo the Status
        echo -e "\n \t Installing $service client..."

        # Start the process and push it to background
        npm install &

        # Wait for process to get completed
        wait

        # Audit fix the packages if required
        npm audit fix --force &
        
        # Wait for process to get completed
        wait

        # Echo the status
        echo -e "\n \t $service client installed successfully!"  

        # Go back to main working directory(i.e. - root)
        cd -
    done