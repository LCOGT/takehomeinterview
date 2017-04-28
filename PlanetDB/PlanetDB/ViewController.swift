//
//  ViewController.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/27/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    //MARK: Properties
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var planetNameLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    //MARK: Actions
    @IBAction func setDefaultLabelText(_ sender: UIButton) {
        planetNameLabel.text = "Default Text"
    }
    

}

