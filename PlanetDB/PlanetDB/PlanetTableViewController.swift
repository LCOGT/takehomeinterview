//
//  PlanetTableViewController.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/28/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit
import os.log

class PlanetTableViewController: UITableViewController {
    
    //MARK: Properties
    
    var planets = [Planet]()
    var names = Set<String>()
    var ordinals = Set<String>()
    var errorCode = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Use the edit button item provided by the table view controller.
        navigationItem.leftBarButtonItem = editButtonItem
        
        // Load any saved planets, otherwise load sample data.
        if let savedPlanets = loadPlanets() {
            planets += savedPlanets
            for planet in planets {
                names.insert(planet.name)
                ordinals.insert(planet.ordinality!)
                ordinals.remove("")
            }
        }
        else {
            // Load the sample data if desired
            // loadSamplePlanets()
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        let alert3 = UIAlertController(title: "Duplicate Name", message: "Please try again", preferredStyle: .alert)
        alert3.addAction(UIAlertAction(title: "Okay, fine...", style: .default) { action in })
        
        let alert4 = UIAlertController(title: "Duplicate Ordinality", message: "Please try again", preferredStyle: .alert)
        alert4.addAction(UIAlertAction(title: "Okay, fine...", style: .default) { action in })
        
        // if returned a duplicate name or duplicate ordinality
        if errorCode == 3 {
            self.present(alert3, animated: true)
            errorCode = 0
        } else if errorCode == 4 {
            self.present(alert4, animated: true)
            errorCode = 0
        }
        
        // re-initialize the name and ordinality sets
        names.removeAll()
        ordinals.removeAll()
        for planet in planets {
            names.insert(planet.name.lowercased())
            ordinals.insert(planet.ordinality!)
            ordinals.remove("")
        }
    }


    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return planets.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "PlanetTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? PlanetTableViewCell  else {
            fatalError("The dequeued cell is not an instance of PlanetTableViewCell.")
        }
        
        // Fetches the appropriate planet for the data source layout.
        let planet = planets[indexPath.row]
        
        cell.nameLabel.text = planet.name
        cell.ordinalityLabel.text = planet.ordinality
        cell.sizeLabel.text = planet.size
        cell.distanceLabel.text = planet.distance
        cell.photoImageView.image = planet.photo
        
        return cell
    }


    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            names.remove(planets[indexPath.row].name.lowercased())
            ordinals.remove(planets[indexPath.row].ordinality!)
            planets.remove(at: indexPath.row)
            savePlanets()
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
            
        case "AddItem":
            os_log("Adding a new planet.", log: OSLog.default, type: .debug)
            
        case "ShowDetail":
            guard let planetDetailViewController = segue.destination as? PlanetViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            guard let selectedPlanetCell = sender as? PlanetTableViewCell else {
                fatalError("Unexpected sender: \(String(describing: sender))")
            }
            
            guard let indexPath = tableView.indexPath(for: selectedPlanetCell) else {
                fatalError("The selected cell is not being displayed by the table")
            }
            
            let selectedPlanet = planets[indexPath.row]
            planetDetailViewController.planet = selectedPlanet
            names.remove(selectedPlanet.name.lowercased())
            ordinals.remove(selectedPlanet.ordinality!)
            
        default:
            fatalError("Unexpected Segue Identifier; \(String(describing: segue.identifier))")
        }
    }
    
    
    //MARK: Actions
    @IBAction func unwindToPlanetList(sender: UIStoryboardSegue) {
        if let sourceViewController = sender.source as? PlanetViewController, let planet = sourceViewController.planet {
            
            // check or non-duplicate name
            if names.contains(planet.name.lowercased()) {
                errorCode = 3
                return
            }
            
            // check or non-duplicate ordinality
            if ordinals.contains(planet.ordinality!) {
                errorCode = 4
                return
            }
            
            if let selectedIndexPath = tableView.indexPathForSelectedRow {
                // Update an existing planet.
                planets[selectedIndexPath.row] = planet
                tableView.reloadRows(at: [selectedIndexPath], with: .none)
            }
            else {
                // Add a new planet.
                let newIndexPath = IndexPath(row: planets.count, section: 0)
                
                planets.append(planet)
                tableView.insertRows(at: [newIndexPath], with: .automatic)
            }
            
            // Save the planets.
            savePlanets()
        }
    }
    
    
    //MARK: Private Methods
    private func loadSamplePlanets() {
        
        let photo1 = UIImage(named: "planet1")
        let photo2 = UIImage(named: "planet2")
        
        guard let planet1 = Planet(name: "Earth", ordinality: "3", size: "1.0", distance: "0.0", descript: "Our humble home",  photo: photo1) else {
            fatalError("Unable to instantiate planet1")
        }
        
        guard let planet2 = Planet(name: "Mars", ordinality: "4", size: "0.107", distance: "1.41", descript: "Mars is the dry and inhospitable 4th planet from the Sun. It is here that Matt Damon grew potatoes using his own poop.",  photo: photo2) else {
            fatalError("Unable to instantiate planet2")
        }
        
        planets += [planet1, planet2]
    }
    
    private func savePlanets() {
        let isSuccessfulSave = NSKeyedArchiver.archiveRootObject(planets, toFile: Planet.ArchiveURL.path)
        if isSuccessfulSave {
            os_log("Planets successfully saved.", log: OSLog.default, type: .debug)
        } else {
            os_log("Failed to save planets...", log: OSLog.default, type: .error)
        }
    }
    
    private func loadPlanets() -> [Planet]? {
        return NSKeyedUnarchiver.unarchiveObject(withFile: Planet.ArchiveURL.path) as? [Planet]
    }
}
