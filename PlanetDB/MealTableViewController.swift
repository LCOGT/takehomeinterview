//
//  MealTableViewController.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/26/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit
import os.log

class MealTableViewController: UITableViewController {
    
    
    //MARK: Properties
    var planets = [Planet]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Use the edit button item provided by the table view controller.
        navigationItem.leftBarButtonItem = editButtonItem
        
        // Load any saved meals, otherwise load sample data.
        if let savedPlanets = loadPlanets() {
            planets += savedPlanets
        }
        else {
            // Load the sample data.
            loadSampleMeals()
        }

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // return the number of rows
        return planets.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "MealTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? MealTableViewCell  else {
            fatalError("The dequeued cell is not an instance of MealTableViewCell.")
        }
        
        // Fetches the appropriate meal for the data source layout.
        let meal = planets[indexPath.row]
        
        cell.nameLabel.text = meal.name
        cell.photoImageView.image = meal.photo
        cell.ratingControl.rating = meal.rating

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
            planets.remove(at: indexPath.row)
            savePlanets()            // Save the meals.
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
            os_log("Adding a new meal.", log: OSLog.default, type: .debug)
            
        case "ShowDetail":
            guard let mealDetailViewController = segue.destination as? PlanetViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            guard let selectedMealCell = sender as? MealTableViewCell else {
                fatalError("Unexpected sender: \(String(describing: sender))")
            }
            
            guard let indexPath = tableView.indexPath(for: selectedMealCell) else {
                fatalError("The selected cell is not being displayed by the table")
            }
            
            let selectedPlanet = planets[indexPath.row]
            mealDetailViewController.planet = selectedPlanet
            
        default:
            fatalError("Unexpected Segue Identifier; \(String(describing: segue.identifier))")
        }
    }
    
    
    //MARK: Actions
    @IBAction func unwindToPlanetList(sender: UIStoryboardSegue) {
        
        if let sourceViewController = sender.source as? PlanetViewController, let planet = sourceViewController.planet {
            
            if let selectedIndexPath = tableView.indexPathForSelectedRow {
                // Update an existing meal.
                planets[selectedIndexPath.row] = planet
                tableView.reloadRows(at: [selectedIndexPath], with: .none)
            }
            else{
                // Add a new meal.
                let newIndexPath = IndexPath(row: planets.count, section: 0)
                
                planets.append(planet)
                tableView.insertRows(at: [newIndexPath], with: .automatic)
            }
            
            // Save the meals.
            savePlanets()
        }
    }
    
        
    //MARK: Private Methods
    private func loadSampleMeals() {
        
        let photo1 = UIImage(named: "meal1")
        let photo2 = UIImage(named: "meal2")
        let photo3 = UIImage(named: "meal3")
        
        guard let meal1 = Planet(name: "Caprese Salad", photo: photo1, rating: 4) else {
            fatalError("Unable to instantiate meal1")
        }
        
        guard let meal2 = Planet(name: "Chicken and Potatoes", photo: photo2, rating: 5) else {
            fatalError("Unable to instantiate meal2")
        }
        
        guard let meal3 = Planet(name: "Pasta with Meatballs", photo: photo3, rating: 3) else {
            fatalError("Unable to instantiate meal3")
        }
        
        // Add Meal objects to the meals array
        planets += [meal1, meal2, meal3]
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
